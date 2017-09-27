/**
 * RecordingsListActions has all actionable functions of login.
 */
export default class RecordingsListActions {
    /**
     * Makes an API call to get recordings list.
     */
    getList(userToken, success, error) {
        fetch('https://i2x-challenge.herokuapp.com/ai/recording/list/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT '+userToken
            }
        }).then(response => {
            let _json = response.json()
            return _json ? _json : { "key": true }            
        })
        .then(response => {
            if(response.results){
                success(response);
            }else{
                error(response);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }


}