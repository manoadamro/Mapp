$("#send").click(function(event) {
            message = document.getElementById('messageform').value;
            $.post("/message/new", {"message": message}).done
            document.getElementById('messageform').value = ''
            event.preventDefault();
        });