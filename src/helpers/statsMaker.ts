interface IStat {
  addStat: Function;
  getStatData: Function;
}


class Stat implements IStat {
  range: string[];
  statCollection: {};
  constructor () {
    this.range = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    this.statCollection = {}
  }

  addStat(timeStamp: Date, data: number) {
    timeStamp
    data
  }
  getStatData(){
    // @ts-ignore
    let data = this.range.map((day)=> this.statCollection[day]? this.statCollection[day]: 0)
    let label = this.range
    return {
      data,
      label 
    }
  }
}
