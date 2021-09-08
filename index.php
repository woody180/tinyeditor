<?php

    // Get patch request
    if (strtolower($_SERVER['REQUEST_METHOD']) == 'patch') {

        // Set header
        header('Content-Type: application/json');

        // Get request data
        $data = json_decode(file_get_contents('php://input'));

        echo json_encode(['info' => 'Content saved successfully!']);
        die;
    }

?>





<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.6.21/dist/css/uikit.min.css" />

    <!-- UIkit JS -->
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.6.21/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.6.21/dist/js/uikit-icons.min.js"></script>

    <script src="tinyeditor/tinyeditor.js"></script>

    <title>APP</title>
</head>

<body>

    <section class="uk-section">
        <div class="uk-container">

            <div class="editable">
                <div class="editable-cage">
                    <h1>Heading for table</h1>
                </div>
            </div>

            <div class="editable" default-tools="false" tools="[icon: 🎃; title: Something; callback: something;][icon: 🦘; title: New title; callback: something;]">
                <div class="editable-cage">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos perferendis aspernatur
                        necessitatibus quos possimus corporis praesentium dolorum laudantium alias consectetur excepturi
                        quidem, nam cum, tenetur, quas magni sapiente? Odit, adipisci.</p>
                </div>
            </div>

            <table class="uk-table uk-table-divideruk-table uk-table-striped editable">
                <tbody class="editable-cage">
                    <tr>
                        <td style="width: 49.6364%;">one</td>
                        <td style="width: 49.7273%;">two</td>
                    </tr>
                    <tr>
                        <td style="width: 49.6364%;">three</td>
                        <td style="width: 49.7273%;">four</td>
                    </tr>
                    <tr>
                        <td style="width: 49.6364%;">three</td>
                        <td style="width: 49.7273%;">four</td>
                    </tr>
                    <tr>
                        <td style="width: 49.6364%;">three</td>
                        <td style="width: 49.7273%;">four</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="uk-container">

            <div class="editable" tools="[icon: 🦘; title: New title; callback: something;]">
                <div class="editable-cage">
                    <h1>This is something</h1>
                </div>
            </div>

            <div class="editable" wipe-tags="true">
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
            rootPath: 'http://localhost:8080/tinyeditor',
            saveUrl: 'http://localhost:8080',
            // defaultTools: true,
            loadjQuery: true,
            tools: [{
                icon: '📂',
                title: 'Paint this',
                callback: () => filemanager(() => {})
            }],
            onActive: e => console.log('Active'),
            onDisabled: e => console.log('Disabled'),
            onClick: e => console.log('clicked'),
            onResponse: res => console.log(res),
            //onSave: data => console.log(data), // Optional
            tinymceConfig: {},
            inlineFunctions: {
                something: () => {
                    alert('done');
                }
            }
        });
    </script>

</body>

</html>