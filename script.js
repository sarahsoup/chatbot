
d3.csv('./assets/script.csv').then(data => {
    console.log(data);
    const rounds = d3.nest()
        .key(d => d.round)
        .entries(data);

    console.log(rounds);

    const container = d3.select('.container');

    rounds.forEach((round,i) => {
        // append erica div
        const ericaIndex = round.values.map(d => d.name).indexOf('erica');
        const ericaText = round.values[ericaIndex].option;
        const ericaRow = container.append('div')
            .attr('class',(round.key == '1') ? `row round round-${round.key}` : `row round round-${round.key} hidden`)
            .attr('id',`round-${round.key}-erica`);
        ericaRow.append('div')
            .attr('class','col-2 col-lg-1 offset-lg-2')
            .append('img')
            .attr('class','erica-square')
            .attr('src','./assets/erica_square.png');
        ericaRow.append('div')
            .attr('class','col-8 col-lg-6')
            .append('div')
            .attr('class','erica')
            .append('div')
            .attr('class','bubble-erica')
            .append('p')
            .html(ericaText.substring(1, ericaText.length-1));

        // append user div
        const user = container.append('div')
            .attr('class',(round.key == '1') ? `row round round-${round.key}` : `row round round-${round.key} hidden`)
            .attr('id',`round-${round.key}-user`)
            .append('div')
            .attr('class','col-12 offset-md-2 col-md-8 offset-lg-3 col-lg-6')
            .append('div')
            .attr('class','user');
        if(i < rounds.length-1){
            user.append('h2')
                .attr('class','narrator')
                .html('How would you reply?');
        }else{
            user.append('h2')
                .attr('class','narrator')
                .html(round.values[0].response.substring(1,round.values[0].response.length-1));
        }
        user.selectAll('.response')
            .data(round.values.filter(d => d.name != 'erica'))
            .enter()
            .append('h2')
            .attr('class','narrator hidden')
            .attr('id',d => `response-${d.name}`)
            .html(d => d.response.substring(1,d.response.length-1));
        user.selectAll('.option')
            .data(round.values.filter(d => d.name != 'erica'))
            .enter()
            .append('div')
            .attr('class','option')
            .attr('id',d => `option-${d.name}`)
            .on('click',d => {
                if(d.name == 'good'){
                    selectGood(+round.key);
                }else{
                    console.log(d.name.substring(d.name.length-1))
                    selectBad(+round.key,+d.name.substring(d.name.length-1));
                }
            })
            .append('p')
            .html(d => d.option.substring(1,d.option.length-1));
        
    })
})

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