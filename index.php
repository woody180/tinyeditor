<?php

    // Get patch request
    if (strtolower($_SERVER['REQUEST_METHOD']) == 'patch') {

        // Set header
        header('Content-Type: application/json');

        // Get request data
        $data = json_decode(file_get_contents('php://input'));

        echo json_encode(['success' => 'Content saved successfully!']);
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

    <script>
        //const urlroot = "http://tinyeditor.localhost"
    </script>
    <script src="tinyeditor/tinyeditor.js"></script>

    <title>APP</title>
</head>

<body>

    <section>
        <div class="container">
            <div class="editable">
                <div class="editable-cage">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos perferendis aspernatur
                        necessitatibus quos possimus corporis praesentium dolorum laudantium alias consectetur excepturi
                        quidem, nam cum, tenetur, quas magni sapiente? Odit, adipisci.</p>
                    <table style="border-collapse: collapse; width: 100%;" border="1">
                        <tbody>
                            <tr>
                                <td style="width: 49.6364%;">one</td>
                                <td style="width: 49.7273%;">two</td>
                            </tr>
                            <tr>
                                <td style="width: 49.6364%;">three</td>
                                <td style="width: 49.7273%;">four</td>
                            </tr>
                        </tbody>
                    </table>
                    <h1>This is something</h1>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="editable">
                <div class="editable-cage">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos perferendis aspernatur
                        necessitatibus quos possimus corporis praesentium dolorum laudantium alias consectetur excepturi
                        quidem, nam cum, tenetur, quas magni sapiente? Odit, adipisci.</p>
                </div>
            </div>
        </div>
    </section>









    <script>
        new FgTinyEditor({
            selector: '.editable',
            rootPath: 'http://localhost:3000/tinyeditor',
            saveUrl: 'http://localhost:3000',
            loadjQuery: true,
            tools: [{
                icon: '📂',
                title: 'Paint this',
                callback: () => filemanager(() => {})
            }, {
                icon: '🎃',
                title: 'Paint this',
                callback: () => alert('Custom button with alert callback')
            }],
            onActive: e => console.log('Active'),
            onDisabled: e => console.log('Disabled'),
            onClick: e => console.log('clicked'),
            onResponse: res => console.log(res),
            onSave: data => console.log(data), // Optional
            tinymceConfig: {}
        });
    </script>

</body>

</html>