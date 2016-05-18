# cleanest
Clean nested data for easier consumption by Redux reducers [![Build Status](https://travis-ci.org/hunterlester/cleanest.svg?branch=master)](https://travis-ci.org/hunterlester/cleanest)

Given a nested array of objects: The array is replaced with an object and each object within the original array is replaced with a key value, where `key == object._id`;

Note: Input data is not mutated. `Object.assign` is used within the function to compose new objects;

I'm intending to use this piece of code in production with the following assumptions:
- every object has a unique `_id` property
- Deeply nested tree view data structure
- Redux
- React
- Mongoose/MongoDB
- Express
- NodeJS
- ImmutableJS

*I'll keep this package updated as I come across breaking edge cases.*

*Let me know what interesting problems you come across or if this function is just not useful at all. I'd love to know.*  

# Installation
    npm install --save cleanest

# Usage
    // es6
    import cleanest from 'cleanest';

    // non-es6
    var cleanest = require('cleanest').default;



### Example of data transformation
#### Before
    {
      "username": "hunterlester",
      "_id": "57361fca8ee4b6cead15240a",
      "study_maps": [
        {
          "_id": "573670f7a84bcc2eb75d9947",
          "links": [
            {
              "_id": "57371c4e4fd77666b9f05565",
              "breadcrumbs": [
                {
                  "_id": "573a0a4646431cdcd896213e",
                  "messages": [
                    {
                      "_id": "573a0a4d46431cdcd8962140"
                    }
                  ]
                }
              ]
            }
          ],
          "breadcrumbs": [
            {
              "_id": "573726da767f8054ba048bc9"
            }
          ]
        },
        {
          "_id": "5737415e3802a477bd2387ab",
          "breadcrumbs": [
            {
              "_id": "57389da0a0c9bb59c6d1e4fc"
            }
          ]
        }
      ]
    }
#### After
    {
      "username":"hunterlester",
      "_id":"57361fca8ee4b6cead15240a",
      "study_maps":{
        "573670f7a84bcc2eb75d9947":{
          "_id":"573670f7a84bcc2eb75d9947",
          "links":{
            "57371c4e4fd77666b9f05565":{
              "_id":"57371c4e4fd77666b9f05565",
              "breadcrumbs":{
                "573a0a4646431cdcd896213e":{
                  "_id":"573a0a4646431cdcd896213e",
                  "messages":{
                    "573a0a4d46431cdcd8962140":{
                      "_id": "573a0a4d46431cdcd8962140"
                    }
                  }
                }
              }
            }
          },
          "breadcrumbs":{
            "573726da767f8054ba048bc9":{
              "_id": "573726da767f8054ba048bc9"
              }}},
        "5737415e3802a477bd2387ab":{
          "_id":"5737415e3802a477bd2387ab",
          "breadcrumbs":{
            "57389da0a0c9bb59c6d1e4fc":{
              "_id": "57389da0a0c9bb59c6d1e4fc"
            }
          }
        }
      }
    }
