$("#send").click(function(event) {
            message = document.getElementById('messageForm').value;
            $.post("/message/new", {"message": message}).done
            document.getElementById('messageList').innerHTML += (message + '<br/>')
            document.getElementById('messageForm').value = ''
            event.preventDefault();
        });
