
// // align erica portraits
// d3.select('#round-1')

function selectBad(round,option){
    const user = d3.select(`#round-${round}-user`).select('.user');

    // translate to speech bubble
    // replace if other bad option was previously chosen
    user.selectAll('div')  
        .each(function(d,i){
            const order = d3.select(this).style('order');
            if(order != '0'){
                d3.select(this).classed('hidden',true);
            }else if(this.id == `option-bad${option}`){
                d3.select(this)
                    .classed('option',false)
                    .classed('bubble-user',true)
                    .style('order',`-${i+1}`);
            }
        })

    // give narrator response
    user.selectAll('.narrator')
        .classed('hidden',function(){
            return (this.id == `response-bad${option}`) ? false : true;
        })

}

function selectGood(round){
    const user = d3.select(`#round-${round}-user`).select('.user');

    // translate to speech bubble
    // replace if bad option was previously chosen
    user.selectAll('div')
        .each(function(d,i){
            // const order = d3.select(this).style('order');
            // if(order != '0'){
            //     d3.select(this).style('order','0');
            // }
            if(this.id == 'option-good'){
                d3.select(this)
                    .classed('option',false)
                    .classed('bubble-user',true)
                    .style('order',`-${i+1}`);
            }else{
                d3.select(this).classed('hidden',true);
            }
        })

    // give narrator response
    user.selectAll('.narrator')
        .classed('hidden',function(){
            return (this.id == 'response-good') ? false : true;
        })
    // user.select('.narrator').classed('hidden',true);
    // user.select('#response-good').classed('hidden',false);

    // show next round
    d3.selectAll(`.round-${round+1}`).classed('hidden',false);
}