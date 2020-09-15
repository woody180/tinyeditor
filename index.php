<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    
    <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.5.7/dist/css/uikit.min.css" />

    <!-- UIkit JS -->
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.7/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.7/dist/js/uikit-icons.min.js"></script>
    
    <title>APP</title>
</head>
<body>
    
    
    <div class="uk-container uk-container-xsmall uk-padding">
       
        <div class="editable">
            <div class="editable-cage">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus accusantium eveniet voluptatibus deserunt repellendus repellat unde, aliquid vero, natus nostrum officia ad, numquam at cumque aliquam id laudantium quam iste?</p>
            </div>
        </div>
        
        
        <div class="editable">
            <div class="editable-cage">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus accusantium eveniet voluptatibus deserunt repellendus repellat unde, aliquid vero, natus nostrum officia ad, numquam at cumque aliquam id laudantium quam iste?</p>
            </div>
        </div>
        
        
        <div class="editable">
            <div class="editable-cage">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus accusantium eveniet voluptatibus deserunt repellendus repellat unde, aliquid vero, natus nostrum officia ad, numquam at cumque aliquam id laudantium quam iste?</p>
            </div>
        </div>
        
        <div class="editable" alias="some->two">
            <div class="editable-cage">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus accusantium eveniet voluptatibus deserunt repellendus repellat unde, aliquid vero, natus nostrum officia ad, numquam at cumque aliquam id laudantium quam iste?</p>
            </div>
        </div>
        
        
        <div class="editable" alias="one->one">
            <div class="editable-cage">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus accusantium eveniet voluptatibus deserunt repellendus repellat unde, aliquid vero, natus nostrum officia ad, numquam at cumque aliquam id laudantium quam iste?</p>
            </div>
        </div>
        
        
    </div>
    
    
    <script src="main.js"></script>
    <script src="tinyeditor.js"></script>
    <script>const urlroot = 'http://tinyeditor.localhost'</script>

    <script>
        FgTinyEditor.init({
            path: 'http://tinyeditor.localhost',
            saveUrl: 'http://tinyeditor.localhost/pages/save',
            tools: [
                {
                    icon: 'paint-bucket',
                    title: 'Pain this',
                    callback: () => {
                        alert('Pain something');
                    }
                }
            ]
        });
    </script>
</body>
</html>