export interface ONG {
    id: number;
    nome: string;
    descricao: Text;
    local: { cidade: string; estado: string; endereco: string };
  }
  export const ongs = [
    {
      id: 0,
      nome: 'ONG Mãos Solidárias',
      descricao:
        "A ONG 'Mãos Solidárias' foi fundada há mais de uma década por um grupo de amigos que se comoveu com a situação de moradores de rua e famílias carentes que viviam em situação de extrema pobreza em sua cidade. Eles perceberam que muitas pessoas não tinham acesso a alimentos nutritivos e saudáveis, o que impactava negativamente sua saúde e bem-estar.",
      local: {
        cidade: 'São Paulo',
        estado: 'SP',
        endereco: 'Rua das amélias, 56',
      },
    },
    {
        id: 1,
        nome: 'ONG Caminho Dourado',
        descricao:
          "A ONG 'Caminho Dourado' foi fundada há mais de três década por um grupo de estudantes que se comoveu com a situação de moradores de rua e famílias carentes que viviam em situação de extrema pobreza em sua cidade. Eles perceberam que muitas pessoas não tinham acesso a alimentos nutritivos e saudáveis, o que impactava negativamente sua saúde e bem-estar.",
        local: {
          cidade: 'Guarulhos',
          estado: 'SP',
          endereco: 'Rua Floro de Oliveira, 235',
        },
      },
      {
        id: 2,
        nome: 'ONG Linda Flor',
        descricao:
          "A ONG 'Linda Flor' foi fundada há mais de cinco anos por um grupo de amigas que se comoveu com a situação de moradores de rua e famílias carentes que viviam em situação de extrema pobreza em sua cidade. Eles perceberam que muitas pessoas não tinham acesso a alimentos nutritivos e saudáveis, o que impactava negativamente sua saúde e bem-estar.",
        local: {
          cidade: 'Maceió',
          estado: 'Alagoas',
          endereco: 'Rua das Comélias, 102',
        },
      }
  ];
  