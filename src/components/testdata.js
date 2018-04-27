var condition1 = {
  "type": "keyword",
  "options": {
    "words": [
      "稻佐山1","佐稻山11"
    ]
  }
};
var condition = {
  "id": "sdad",
  "label": "and",
  "nodes": [
    {
      "id": "sdad11111",
      "pid": "sdad",
      "type": "keyword",
      "options": {
        "words": [
          "稻佐山1","佐稻山11"
        ]
      }
    },
    {
      "id": "sdad12222",
      "pid": "sdad",
      "type": "keyword",
      "options": {
        "words": [
          "稻佐山2"
        ]
      }
    },
    {
      "id": "sdad13333",
      "pid": "sdad",
      "label": "or",
      "nodes": [
        {
          "id": "sdad13333a",
          "pid": "sdad13333",
          "type": "keyword",
          "options": {
            "words": [
              "稻佐山3"
            ]
          }
        },
        {
          "id": "sdad13333aaa",
          "pid": "sdad13333",
          "label": "not",
          "nodes": [
            {
              "id": "sdad13333aaa",
              "pid": "sdad13333aaa11111",
              "type": "keyword",
              "options": {
                "words": [
                  "稻佐山4"
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}
export default condition;