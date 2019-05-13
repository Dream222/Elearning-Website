import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }

  sort(array, sortby, direc)
  {
      array.sort(function(i1,i2){
          if(i1[sortby] < i2[sortby])
              return direc == 'ascend'  ? -1 : 1;
          else if(i1[sortby] > i2[sortby])
              return direc == 'descend' ? -1 : 1;
          else
              return 0;
      });
      return array;
  }

  percent(part : number, hole : number)
  {
      if(!hole)
        return 0;
      return Math.round(part/hole*100);
  }

  _1_to_one(number : number)
  {
     if(number == 0 || number < 0)
        return false;
     return number == 1 ? 'one' : (number == 2 ? 'two' : 'three');
  }

  convert_msec_to_string(time : number)
  {
      let _time;
      var time_temp = (time - time % 1000) / 1000;
      var time_min = (time_temp - time_temp % 60) / 60;
      var time_sec = time_temp % 60;
      _time = (time_min < 10) ? ('0' + time_min + ' : ') : (time_min + ' : ');
      _time += (time_sec < 10) ? ('0' + time_sec) : time_sec;
      return _time;
  }

  json_solver(json , key : Array<any>)
  {
      if(key.length == 0)
      {
        return json;
      }

      let v = json, i = 0;
      while ( i < key.length)
      {
          let k = key[i];
          v = v[k];
          i++;
      }
      return v;
  }

  el_json_dict(json = null, unit)
  {
      if(unit.type == 'static')
        return unit.value;
      if(unit.type == 'toggle')
          return unit.value ? unit.text[0] : unit.text[1];
      if(json)
        return this.json_solver(json, unit.value);
  }

  plural_form(n, tag)
  {
      return (typeof n !== 'number') || (typeof n === 'number' && n == 1) ? tag : tag + 's';
  }

  del_ele_from_array(el, ar)
  {
      const index : number = ar.indexOf(el);
      if (index !== -1) {
          ar.splice(index, 1);
    }
  }

  include(one, two)
  {
      let x1 = one.offset;
      let x2 = one.offset + one.length;
      let y1 = two.offset;
      let y2 = two.offset + two.length;
      if((x1 >= y1 && x2 <= y2) || (x1 <= y1 && x2 >=y2))
        return true;
      return false;
  }
}
