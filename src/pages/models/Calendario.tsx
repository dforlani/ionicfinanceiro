export class Calendario {
  meses: string[] = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  mesSelecionado: string;
  posMesSelecionado: number;
  anoSelecionado: number;

  constructor() {
    var cal = new Date();

    this.mesSelecionado = this.meses[cal.getMonth()];
    this.posMesSelecionado = cal.getMonth();
    this.anoSelecionado = cal.getFullYear();
  }

  getMesAtual = () => {
    var month = new Date();
    return this.meses[month.getMonth()];
  };

  getMesByNumero = (numero: number) => {
    return this.meses[numero];
  };

  getAnoAtual = () => {
    var ano = new Date();
    return ano.getFullYear();
  };

  getPosProximoMes = () => {
    if (this.posMesSelecionado == 11) {
      return 0;
    } else {
      return this.posMesSelecionado + 1;
    }
  };

  getPosAnteriorMes = () => {
    if (this.posMesSelecionado == 0) {
      return 11;
    } else {
      return this.posMesSelecionado - 1;
    }
  };

  getNomeProximoMes = (): string => {
    if (this.posMesSelecionado == 11) {
      return this.meses[0];
    } else {
      return this.meses[this.posMesSelecionado + 1];
    }
  };

  getNomeAnteriorMes = (): string => {
    if (this.posMesSelecionado == 0) {
      return this.meses[11];
    } else {
      return this.meses[this.posMesSelecionado - 1];
    }
  };

  /**
   * Só pula pro próximo ano se o mês for o último do ano = 11
   */
  getProximoAno = () => {
    if (this.posMesSelecionado == 11) {
      return this.anoSelecionado + 1;
    } else {
      return this.anoSelecionado;
    }
  };

  /**
   * Só pula pro ano anterior se o mês for o último do ano = 0
   */
  getAnteriorAno = () => {
    if (this.posMesSelecionado == 0) {
      return this.anoSelecionado - 1;
    } else {
      return this.anoSelecionado;
    }
  };

  getProximoCalendario = (): Calendario => {
    this.anoSelecionado = this.getProximoAno();
    this.mesSelecionado = this.getNomeProximoMes();
    this.posMesSelecionado = this.getPosProximoMes();
    return this;
  };

  getAnteriorCalendario = (): Calendario => {
    this.anoSelecionado = this.getAnteriorAno();
    this.mesSelecionado = this.getNomeAnteriorMes();
    this.posMesSelecionado = this.getPosAnteriorMes();
    return this;
  };

  getMesAno = () => {
    return this.posMesSelecionado + 1 + " " + this.anoSelecionado;
  };

  getDatePrimeiroDiaMes = (): Date => {
    return new Date(this.anoSelecionado, this.posMesSelecionado, 1);
  };
  getDateUltimoDiaMes = (): Date => {
    return new Date(this.anoSelecionado, this.posMesSelecionado + 1, 0);
  };
}
