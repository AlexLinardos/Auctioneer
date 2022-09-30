import logging
import numpy as np
from sklearn.metrics import mean_squared_error
from math import sqrt
from ..models import Profile, Item, Recommendation, Bid
from .serializers.userSerializers import ProfileSerializer

# MF_recommendations function uses matrix_factorization() function to produce
# item recommendations for all currently registered users
def MF_recommendations():
    logging.debug("Running matrix factorization...")

    # Fetching and preparing data
    profiles_qs = Profile.objects.all()
    serializer = ProfileSerializer(profiles_qs, many=True)
    item_ids = list(Item.objects.all().values_list('_id', flat=True))
    item_ids.sort()

    bids_qs = list(Bid.objects.all().values())

    user_bids = {}
    for result in bids_qs:
        profile_by_userID = Profile.objects.get(user=result['user_id'])
        serializer2 = ProfileSerializer(profile_by_userID, many=False)

        if serializer2.data['id'] in user_bids:
            user_bids[serializer2.data['id']].append(result["item_id"])
        else:
            user_bids[serializer2.data['id']] = [result["item_id"]]
    logging.debug(user_bids)

    user_interractions = []
    for profile in serializer.data:
        if profile['id'] in user_bids:
            user_interractions.append((profile['id'], profile['visits'], user_bids[profile['id']]))
        else:
            user_interractions.append((profile['id'], profile['visits'], []))

    user_interractions.sort()
    logging.debug(user_interractions)

    matrix = []
    for _,visits,bids in user_interractions:
        user_row = []
        for id in item_ids:
            if id in visits:
                if id in bids:
                    user_row.append(2)
                else:
                    user_row.append(1)
            elif id in bids:
                user_row.append(2)
            else:
                user_row.append(0)
        matrix.append(user_row)

    # Running Matrix Factorization algorithm
    X = np.array(matrix)
    logging.debug(X)
    N = len(X)
    M = len(X[0])
    K = 2
    V = np.random.rand(N,K)
    F = np.random.rand(M,K)
    nX, recommends = matrix_factorization(X, V, F, K, 5)

    # Matching recommandation columns with item ids
    for row in recommends:
        for pair in row:
            pair[1] = item_ids[pair[1]]

    # Matching recommendation rows with user ids and updating database
    for i, pair in enumerate(user_interractions):
        profile_query = Profile.objects.get(id=pair[0])
        for j in range(len(recommends[i])):
            item_query = Item.objects.get(_id=recommends[i][j][1])
            check_exists = Recommendation.objects.filter(profile=profile_query).filter(item=item_query)
            if not check_exists:
                Recommendation.objects.create(profile=profile_query, item=item_query, score=recommends[i][j][0])
            else:
                Recommendation.objects.filter(profile=profile_query).filter(item=item_query).update(score=recommends[i][j][0])

    # Logging results
    MAE = np.mean(np.abs(X-nX))
    logging.debug("MAE=" + str(MAE))

# matrix_factorization function performs the Matrix Factorization algorithm for a given sparse matrix and returning
# 'top' given number of best predictions for each row. Algorithm runs until RMSE doesn't decrease for 2 concecutive
# iterations or until 'threshold' of iterations is reached
def matrix_factorization(X, V, F, K, top, threshold=10000, l_rate=0.0002):
    missing = []
    # iterate to find missing values for each user
    for i in range(len(X)):
        user_missing = []
        for j in range(len(X[i])):
            if (X[i][j] == 0):
                user_missing.append(j)
        missing.append(user_missing)

    # actual algorithm
    F = F.T
    RMSE = float('inf')
    strikes = 0
    iterations = 0 
    while True:
        iterations+=1
        #iterate over each known element of X xij
        for i in range(len(X)):
            for j in range(len(X[i])):
                if X[i][j] > 0:
                    #compute eij
                    eij = X[i][j] - np.dot(V[i,:],F[:,j])
                    for k in range(K):
                        # compute the gradient of eij^2
                        gradient_V = (2 * eij * F[k][j])
                        gradient_F = (2 * eij * V[i][k])
                        # update V and F elements in the opposite direction of the gradient
                        V[i][k] = V[i][k] + l_rate * (gradient_V)
                        F[k][j] = F[k][j] + l_rate * (gradient_F)

        nX = np.dot(V, F)
        new_RMSE = sqrt(mean_squared_error(X, nX))
        if (new_RMSE >= RMSE):
            strikes+= 1
        else:
            strikes = 0
        if (strikes >= 2):
            logging.debug("Ended before reaching threshold")
            break
        if (iterations >= threshold):
            logging.debug("Threshold reached")
            break
        RMSE = new_RMSE 
        
    logging.debug("Final RMSE=" + str(RMSE))

    top_recommends = []
    for i in range(len(X)):
        user_predictions = []
        for j in missing[i]:
            user_predictions.append([nX[i][j], j])
        user_predictions.sort(reverse= True)
        if len(user_predictions) >= top:
            top_recommends.append(user_predictions[:top])
        else:
            top_recommends.append(user_predictions)

    return nX, top_recommends