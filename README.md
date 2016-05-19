# cleanest
Clean nested data for easier consumption by Redux reducers [![Build Status](https://travis-ci.org/hunterlester/cleanest.svg?branch=master)](https://travis-ci.org/hunterlester/cleanest)

Given a nested array of objects: The array is replaced with an object and each object within the original array is replaced with a key value, where `key == object._id`;

Note: Input data is not mutated. `Object.assign` is used within the function to compose new objects;

I'm intending to use this piece of code in production with the following assumptions:
- every object has a unique `_id` property
- every object has a timestamp
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

    //Clean returned API data:

    return fetch(BASE_URL + endpoint, config)
      .then(response =>
        response.json().then(json => ({ json, response }))
      ).then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json)
        }

        let cleaned_json = cleanest(json);

        return cleaned_json;
      }).catch(err => console.log(err))
    }



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
### Compare reducer function:
#### Before cleanest

    case LINK_MESSAGE_POST:
    return state.merge({
      study_maps: state.get('study_maps').map(study_map => {
        if(JSON.parse(action.response).study_map === study_map.get('_id')) {
          return study_map.set('links',
            study_map.get('links').map(link => {
              if(JSON.parse(action.response).link === link.get('_id')) {
                return link.set('breadcrumbs',
                    link.get('breadcrumbs').map(breadcrumb => {
                      if(JSON.parse(action.response).breadcrumb === breadcrumb.get('_id')) {
                        return breadcrumb.set('messages',
                          breadcrumb.get('messages').push(fromJS(JSON.parse(action.response)))
                        );
                      } else {
                        return breadcrumb;
                      }
                    })
                );
              } else {
                return link;
              }
            })
          )
        } else {
          return study_map;
        }
      })
    });

#### After cleanest

    case LINK_MESSAGE_POST:
      let message = action.response;
      return state.setIn(
        ['study_maps', message.study_map,
        'links', message.link, 'breadcrumbs',
        message.breadcrumb, 'messages'], fromJS(message));

### localStorage CRUD
#### Before

    let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
            parsedStudyMaps.find(study_map => {
              if (JSON.parse(text).study_map == study_map._id) {
                study_map.links.find(link => {
                  if(JSON.parse(text).link == link._id) {
                    link.breadcrumbs.find(breadcrumb => {
                      if(JSON.parse(text).breadcrumb == breadcrumb._id) {
                        breadcrumb.messages.push(JSON.parse(text));
                      }
                    })
                  }
                })
              }
            });

#### After
    let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
    parsedStudyMaps[cleaned_json.study_map]
      .links[cleaned_json.link]
      .breadcrumbs[cleaned_json.breadcrumb]
      .messages[cleaned_json._id] = cleaned_json;
