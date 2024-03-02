$(document).ready(function(){
    if(Cookies.get('instructions-shown') != 'true'){
        $("#myModal").modal('show');

        Cookies.set('instructions-shown', 'true', {expires: 7, path: '/', secure: true});
    }
});
