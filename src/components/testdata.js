var condition1 = {
  type: 'keyword',
  options: {
    words: [
      '稻佐山1', '佐稻山11'
    ]
  }
}
var condition2 = {
  id: 'sdad',
  label: 'and',
  nodes: [
    {
      id: 'sdad11111',
      pid: 'sdad',
      type: 'nearmatch',
      options: {
        words: [
          '稻佐山1', '佐稻山11'
        ]
      }
    },
    {
      id: 'sdad12222',
      pid: 'sdad',
      type: 'keyword',
      options: {
        words: [
          '稻佐山2'
        ]
      }
    },
    {
      id: 'sdad13333',
      pid: 'sdad',
      label: 'or',
      nodes: [
        {
          id: 'sdad13333a',
          pid: 'sdad13333',
          type: 'keyword',
          options: {
            words: [
              '稻佐山3'
            ]
          }
        },
        {
          id: 'sdad13333aaa',
          pid: 'sdad13333',
          label: 'not',
          nodes: [
            {
              id: 'sdad13333aaa',
              pid: 'sdad13333aaa11111',
              type: 'keyword',
              options: {
                words: [
                  '稻佐山4'
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}
function update (target, selfId, result) {
  if (target.id === selfId) {
    target.type = result.type
    target.options = result.options
  } else if (target.nodes) {
    target.nodes.forEach(item => {
      update(item, selfId, result)
    })
  }
}

function addFather (target, selfId, logic) {
  if (target.id == selfId) {
    const _target = [...target]; const _parent = { label: logic, nodes: [] }; const _selfId = 'suijishengchengdeid'
    if (target.parentId) _parent.parentId = target.parentId
    _parent.id = _selfId
    _target.parentId = _selfId
    _parent.nodes.push(_target)
  } else if (target.nodes) {
    target.nodes.forEach(item => {
      addFather(item, selfId, logic)
    })
  }
}

function addBrother () {

}

var condition = {
  condition: condition2,
  func: update
}

export default condition
