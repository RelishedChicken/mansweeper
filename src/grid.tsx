import $ from 'jquery';

export function getGrid(size:number) {
  
  const baseDiv = <div style={{width: "100%", height: "100%"}}></div>;
  const widthHeightString = "calc((100% - "+(10*size)+"px) / "+size+")";
  const margin = ((10*(size-1)) / size) + "px";

  const cellStyle = {
    width: widthHeightString,
    height: widthHeightString,
    marginLeft: margin,
    marginTop: margin
  }

  for (let i = 0; i < size; i++) {
    let extraClassesI = "";

    if(i == 0){
      extraClassesI+=" top";
    }
    
    if(i == size - 1){
      extraClassesI+=" bottom";
    }

    for (let k = 0; k < size; k++) {    
      let extraClassesK = "";

      if(k == 0){
        extraClassesK+=" left";

      }

      if(k == size - 1){
        extraClassesK+=" right";
      }

      $(baseDiv).append(<div id={k+":"+i} class={"cell unopened"+extraClassesI+extraClassesK} style={cellStyle}></div>)
    }    
  }

  return baseDiv;

}