/**
 * Created by Endo on 24/05/2017.
 */

jQuery(document).ready(function(){
    var uploadForm = jQuery('#upload-form');

    uploadForm.submit(function(event){
        event.preventDefault();

        /*
         * Realizar el llamado asyncrono y controllar al momento
         * que llegue la respuesta.
         */
        createPhoto().done(function(data){
            if(data!=null){
                window.location.replace('/');
            }
        });

    });
});

function createPhoto() {
    var formData = new FormData(jQuery('#upload-form')[0]);
    console.log(formData);
    return jQuery.ajax({
        url: "/user/registro",
        type: "post",
        contentType: false,
        processData: false,
        data: formData
    });
};

jQuery(document).ready(function(){
    var uploadForm = jQuery('#upload-post');

    uploadForm.submit(function(event){
        event.preventDefault();

        /*
         * Realizar el llamado asyncrono y controllar al momento
         * que llegue la respuesta.
         */

        createPost().done(function(data){
            if(data!=null){
                // window.location.replace('/home.html');
            }
        });
    });
});

function createPost() {
    var formData = new FormData(jQuery('#upload-post')[0]);
    console.log(formData);
    return jQuery.ajax({
        url: "/user/newPost",
        type: "post",
        contentType: false,
        processData: false,
        data: formData
    });
};