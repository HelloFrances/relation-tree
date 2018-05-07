const config = {
  randomNum: 12,
  randomChars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  randomId: function() {
    let res = "";
    for(let i = 0; i < this.randomNum ; i ++) {
      let id = Math.ceil(Math.random()*35);
      res += this.randomChars[id];
    }
    return res;
  },
  logic: [{value:'and',desc:'与逻辑'},{value:'or',desc:'或逻辑'},{value:'not',desc:'非逻辑'}],
  condition:{
    type: [{value:'keyword',desc:'一般匹配规则',placeholder:'输入关键词，多个词用顿号隔开',disable:false},{value:'nearmatch',desc:'临近匹配规则',placeholder:'输入关键词，多个词用顿号隔开',disable:true},{value:'dimrelationship',desc:'标签关系规则',placeholder:'输入关键词，多个词用顿号隔开',disable:true}],
    fields: [{value:'title',desc:'标题'},{value:'content',desc:'正文'}]
  }
}

export default config;