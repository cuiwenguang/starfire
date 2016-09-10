$(function(){
    $("#set_head").click(function(){
        $.get('/user/setHeader', function(data){
            $("#placeholder").html(data);        
        });
    });
});