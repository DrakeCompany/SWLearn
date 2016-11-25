/**
 * Created by Sa on 2016.11.16..
 */
var data = {
    topics: []
};

modalSee();


var source = $("#template").html();
var template = Handlebars.compile(source);

function render(response) {
    $('#leftMain').html('');
    response.forEach((topic)=> {

        // var $topic = $template.clone();
        var leftTimeUnit="Minutes";
        var leftTimeCount = Math.floor((new Date() - new Date(topic.created)) / 1000 / 60);
        if (leftTimeCount > 60) {
            leftTimeCount = Math.floor((new Date() - new Date(topic.created)) / 1000 / 60 / 60);
            leftTimeUnit="Hours";
            // $topic.find('.leftTimeUnit').html(" Hours"); //.css('color','blue'); :-)
            // document.getElementsByClassName("leftTimeUnit").innerHTML=" Hours";
            if (leftTimeCount > 24) {
                leftTimeCount = Math.floor((new Date() - new Date(topic.created)) / 1000 / 60 / 60 / 24);
                // $topic.find('.leftTimeUnit').html(" Days");
                leftTimeUnit="Days";
            }
        };
        topic.leftTimeUnit = leftTimeUnit;
        topic.leftTime=leftTimeCount;

        var topicTemplate= template(topic);
        $('#leftMain').append(topicTemplate);
    });
}

function modalSee() {
    $(document).on('click', '.buttonModal', function () {
        $(".modal").css('display', 'block');
    });
};


var searchId = 0;

function modModalSee() {
    $(document).on('click', '#modButton', function (event) {
        event.preventDefault();
        searchId = $(this).data('id');
        console.log("searchId");
        console.log(searchId);

        $.get('./topics/'+searchId).then(function (response3) {
            $('#titleInput').val(response3.title);
            $('#category').val(response3.category);
            $('#brief').val(response3.brief);
        })
        $(".modal").css('display', 'block');
    });
};
modModalSee();
var sendGlobal = function (titleNew, dateNew, categoryNew, briefNew, viewsNew, replayNew, leftTimeNew, lastReplay) {
    return {
        title: titleNew,
        created: dateNew,
        category: categoryNew,
        brief: briefNew,
        views: viewsNew,
        replay: replayNew,
        leftTime: leftTimeNew,
        lastReplay: lastReplay
    };
};
var httpNewRequest = function (method, url, data2, dataType, contentType) {
    $.ajax({
        method: method,
        url: url,
        data: data2,
        dataType: dataType,
        contentType: contentType
    })
        .then(function () {
            $.get('./topics').then(function (response2) {
                writeToConsole(response2);
                render(response2);
            });
        })
        .catch(function (error) {
            console.error(error);
        });
};
function sendNewTopic() {
    $(document).on('click', '#submit', function (event) {
        event.preventDefault();


        let titleNew = $('#newTopic').find('#titleInput').val();
        let dateNew = new Date();
        let categoryNew = $('#newTopic').find('#category').val();
        let briefNew = $('#newTopic').find('#brief').val();
        let viewsNew =0;
        let replayNew =0;
        let leftTimeNew = 0;
        let lastReplay =0;
        var send = sendGlobal(titleNew, dateNew, categoryNew, briefNew, viewsNew, replayNew, leftTimeNew, lastReplay);
        let method = "POST";
        let url = "/topics";
        let data2 = JSON.stringify(send);
        let dataType = 'json';
        let contentType = 'application/json;charset=UTF-8';

        httpNewRequest(method, url, data2, dataType, contentType);

        $(".modal").css('display', 'none');

    });
}

function writeToConsole(response2) {

    console.log(response2);
}

function deleteActTopic() {
    $(document).on('click', '.deleteTopic', function (event) {
        event.preventDefault();
        var id = $(this).data('id');
        httpNewRequest('DELETE', '/topics/' + id);

    })
}
deleteActTopic();

function modTopic() {
    $(document).on('click', '#modSubmit', function (event) {
        event.preventDefault();

        var views2 = 0;
        var replay2 = 0;
        var lastReplay2 = 0;

        $.get('./topics').then(function (response3) {
            response3.forEach((topic)=> {
                if (topic.id == searchId) {
                    views2 = topic.views;
                    replay2 = topic.replay;
                    lastReplay2 = topic.lastReplay;
                }
            });
        });
        var send = sendGlobal( $('#modTopic').find('#modTitleInput').val(),new Date(),$('#modTopic').find('#modCategory').val(),
            $('#modTopic').find('#modBrief').val(),views2,replay2,0,lastReplay2 );
        httpNewRequest('PUT','/topics/' + searchId,JSON.stringify(send),'json','application/json;charset=UTF-8');

        $(".modModal").css('display', 'none');
    });
};

modTopic();
$.get('./topics').then(function (response2) {
    writeToConsole(response2);
    render(response2);
    sendNewTopic(response2);
});

console.log("handlebars");
console.log(Handlebars);

