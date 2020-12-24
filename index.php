<?php

    // Get patch request
    if (strtolower($_SERVER['REQUEST_METHOD']) == 'patch') {

        // Set header
        header('Content-Type: application/json');

        // Get request data
        $data = json_decode(file_get_contents('php://input'));

        echo json_encode(['success' => 'Content saved successfully']);
        die;
    }

?>





<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        section {
            padding: 60px;
        }
        .container {
            max-width: 1100px;
            margin: auto;
            position: relative;
        }
    </style>

    <title>APP</title>
</head>
<body>

    <section>
        <div class="container">
            <div class="editable">
                <div class="editable-cage">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos perferendis aspernatur necessitatibus quos possimus corporis praesentium dolorum laudantium alias consectetur excepturi quidem, nam cum, tenetur, quas magni sapiente? Odit, adipisci.</p>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="editable">
                <div class="editable-cage">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos perferendis aspernatur necessitatibus quos possimus corporis praesentium dolorum laudantium alias consectetur excepturi quidem, nam cum, tenetur, quas magni sapiente? Odit, adipisci.</p>
                </div>
            </div>
        </div>
    </section>









    <script src="tinyeditor.js"></script>
    <script>const urlroot = "http://tinyeditor.localhost"</script>
    <script>
        FgTinyEditor.init({
            path: 'http://tinyeditor.localhost',
            saveUrl: 'http://tinyeditor.localhost',
            public_dir: 'http://tinyeditor.localhost',
            loadjQuery: false,
            tools: [
                {
                    icon: '&#9742;',
                    title: 'Paint this',
                    callback: () => {
                        alert('Pain something');
                    }
                }
            ],
            onsave: function(res) {
                console.log(res)
            },
        });
    </script>
</body>
</html>