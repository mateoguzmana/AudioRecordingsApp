/**
 * LoginActions has all actionable functions of login.
 */
export default class LoginActions {
    /**
     * Makes an API call to login.
     */
    login(email, password, success, error) {
        fetch('https://i2x-challenge.herokuapp.com/core/login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => {
            let _json = response.json()
            return _json ? _json : { "key": true }            
        })
        .then(response => {
            if(response.token){
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