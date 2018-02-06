YAML file middleware for Atma.IO and Atma.Toolkit
-----

The Plugin provides a custom middleware to transpile yml files to jsons on the fly:
- [`atma-io`](https://github.com/atmajs/atma-io) 
- [`Atma Toolkit`](https://github.com/atmajs/Atma.Toolkit) 
- [`App Bundler`](https://github.com/atmajs/app-bundler) 


##### How to use


###### Embed into the project

+ **Atma Toolkit** 

    ```bash
    $ atma plugin install atma-io-middleware-yml --save-dev
    ```

	This adds `atma-io-middleware-yml` npm dependency and the `package.json` would look like:
    ```javascript
        {
            "devDependencies": {
                "atma-io-middleware-yml"
            },
            "atma": {
                "plugins": [
                    "atma-io-middleware-yml"
                ],
                "settings": {
					"atma-io-middleware-yml": {
                        "yml": {
                            // yaml settings
                        }
                    }
                }
            }
        }
    ```
+ **App Bundler** 
    
    ```bash
    $ npm i atma-io-middleware-yml --save-dev
    ```

    Extend AppBundler config with yaml settings, e.g.
    ```javascript
    {
        /* ... any package json settings */
        "app-bundler": {
            /* ... any app-bundler settings */
            "middlewares": {                
                "yml": [
                    "atma-io-middleware-yml:read"
                ]
            }
        },
    }
    ```

+ Run

    + **Atma Toolkit**  Dev Server
        ```bash
        $ atma server
        ```

    + **App Bundler**  Just run app bundler commands as usual
        
----
The MIT License