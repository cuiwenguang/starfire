$(function(){
    $("#settings").click(function(){
        $.get('/user/settings', function(data){
            $("#placeholder").html(data);        
        });
    });
});