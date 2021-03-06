/**
 * Created by Sa on 2016.11.16..
 */
var data = {
    topics: [
        {
            title:'Quote of the day',
            created: '09 10 2015 11:52:11 GMT+0100',
            category: 'General',
            brief: 'Work hard for what you want because it wont come to you without a fight. You have to be strong and courageous and know...',
            views:10,
            replay:1,
            lastReplay:'09 11 2015 11:52:11 GMT+0100'
        }, {
            title:'lorum ipsum test by member',
            created: '09 09 2015 11:45 AM GMT+0100',
            category: 'General',
            brief: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi...',
            views:4,
            replay:1,
            lastReplay:'09 10 2015 11:45 AM GMT+0100'
        }, {
            title:'kitchen sink test',
            created: '09 09 2015 11:40 AM GMT+0100',
            category: 'General',
            brief: 'This thread is to test the html tags and other related data',
            views:3,
            replay:1,
            lastReplay:'09 10 2015 11:40 AM GMT+0100'
        }, {
            title:'food facts of plusealth',
            created: '09 09 2015 11:31 AM GMT+0100',
            category: 'Pictures',
            brief: 'Food facts of plusHealth.com',
            views:21,
            replay:1,
            lastReplay:'09 10 2015 11:31 AM GMT+0100'
        }, {
            title:'beatuiful videos',
            created: '08 10 2015 18:29 AM GMT+0100',
            category: 'Videos',
            brief: 'The Most Beautiful Videos, That May Make You Cry',
            views:2,
            replay:1,
            lastReplay:'08 11 2015 18:29 AM GMT+0100'
        }, {
            title:'man vs lion',
            created: '08 10 2015 18:20 AM GMT+0100',
            category: 'Videos',
            brief: 'This is test video thread. The video id from youtube and the relative author contains the rights.',
            views:2,
            replay:1,
            lastReplay:'08 11 2015 18:29 AM GMT+0100'
        },
    ]
};

modalSee();
var $template = $('.template');
function render(response) {
        $('#leftMain').html('');

    response.forEach((topic)=>{
        var $topic = $template.clone();
        $topic.removeClass('template');
        $topic.find('.titleArticle').html(topic.title);
        $topic.find('.created').html(topic.created);
        $topic.find('.category').html(topic.category);
        $topic.find('.brief').html(topic.brief);
        $topic.find('.views').html(topic.views);
        $topic.find('.replay').html(topic.replay);
        $topic.find('.lastReplay').html(topic.lastReplay);
        $topic.find('.deleteTopic').data('id',topic.id);

        $('#leftMain').append($topic);
    })

}

function modalSee() {
    $(document).on('click','.buttonModal',function () {
            $(".modal").css('display','block');
        });
};

function sendNewTopic(response) {
    $(document).on('click','#submit',function (event) {
         event.preventDefault();
        var send ={
            title:$('#newTopic').find('#titleInput').val(),
            created:$('#newTopic').find('#created').val(),
            category:$('#newTopic').find('#category').val(),
            brief:$('#newTopic').find('#brief').val(),
            views:$('#newTopic').find('#views').val(),
            replay:$('#newTopic').find('#replay').val(),
            lastReplay:$('#newTopic').find('#lastReplay').val()
        };
        $.ajax({
            method: "POST",
            url: "/topics",
            data: JSON.stringify(send),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8'
        })
            .then(function(resp) {
                console.log(resp);
            })
            .catch(function(error) {
                console.error(error);
            });

        response.push({
            title:$('#newTopic').find('#titleInput').val(),
            created:$('#newTopic').find('#created').val(),
            category:$('#newTopic').find('#category').val(),
            brief:$('#newTopic').find('#brief').val(),
            views:$('#newTopic').find('#views').val(),
            replay:$('#newTopic').find('#replay').val(),
            lastReplay:$('#newTopic').find('#lastReplay').val()
        });

        render(response);
        $(".modal").css('display','none');

    });

}


function writeToConsole(response2) {

    console.log(response2);
}

$.get('./topics').then(function (response2) {
    writeToConsole(response2);
    render(response2);
    sendNewTopic(response2);
});//callback
// console.log($.get('./topics').response);

function deleteActTopic() {
    $(document).on('click', '.deleteTopic',function (event) {
        event.preventDefault();
       var id= $(this).data('id');
        $.ajax({
            method: 'DELETE',
            url: '/topics/' + id
        }).then(function () {// thennel akkor fut le, amikor az az előtte lévő lefutott
            $.get('./topics').then(function (response2) {
                writeToConsole(response2);
                render(response2);
            });
        });//callback

    })

}
deleteActTopic();