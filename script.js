


const state = {
  men: 0,
  women: 0,
  get total() {
    return this.men + this.women;
  }
};


const dom = {
  countTotal: document.getElementById('contTotal'),
  countMen: document.getElementById('contHom'),
  countWomen: document.getElementById('contMuj'),
  btnMenPlus: document.getElementById('botonHomPlus'),
  btnMenMinus: document.getElementById('botonHomMin'),
  btnWomenPlus: document.getElementById('botonMujPlus'),
  btnWomenMinus: document.getElementById('botonMujMin'),
  btnReset: document.getElementById('reseteo'),
  percentMen: document.getElementById('porcentajeHom'),
  percentWomen: document.getElementById('porcentajeMuj')
};


function triggerPulse(element) {
  element.classList.remove('pulAnim');
  void element.offsetWidth; // Forzar reflujo
  element.classList.add('pulAnim');
}


function updateUI(changedKey = null) {

  dom.countTotal.textContent = state.total;
  dom.countMen.textContent = state.men;
  dom.countWomen.textContent = state.women;

  if (changedKey === 'men') triggerPulse(dom.countMen);
  if (changedKey === 'women') triggerPulse(dom.countWomen);
  triggerPulse(dom.countTotal);

 
  dom.btnMenMinus.disabled = state.men <= 0;
  dom.btnWomenMinus.disabled = state.women <= 0;

  if (state.total > 0) {

    const pMen = Math.round(
      (state.men / state.total) * 100
    );

    const pWomen = 100 - pMen;

    dom.percentMen.textContent = `${pMen}%`;
    dom.percentWomen.textContent = `${pWomen}%`;

  } else {

    dom.percentMen.textContent = '0%';
    dom.percentWomen.textContent = '0%';

  }
}



dom.btnMenPlus.addEventListener('click', () => {

  state.men += 1;

  updateUI('men');

});


dom.btnMenMinus.addEventListener('click', () => {

  if (state.men > 0) {

    state.men -= 1;

    updateUI('men');

  }

});



dom.btnWomenPlus.addEventListener('click', () => {

  state.women += 1;

  updateUI('women');

});


dom.btnWomenMinus.addEventListener('click', () => {

  if (state.women > 0) {

    state.women -= 1;

    updateUI('women');

  }

});



dom.btnReset.addEventListener('click', () => {

  if (
    state.total > 0 &&
    confirm('¿Deseas reiniciar todos los contadores a 0?')
  ) {

    state.men = 0;
    state.women = 0;

    updateUI();

  }

});




window.addEventListener('keydown', (e) => {

  if (e.key === 'h' || e.key === 'H') {
    dom.btnMenPlus.click();
  }

  if (e.key === 'm' || e.key === 'M') {
    dom.btnWomenPlus.click();
  }

});


updateUI();