const config = {
    api: {
        url: 'https://yepyou-api.herokuapp.com/',
        devUrl: 'https://yepyou-api-test.herokuapp.com/',
    },
    plan: {
        free: 'free'
    },
    i18n: {
        pt: {
            weekDays: {
                short: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                long: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']        
            },
            months: {
                short: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                long: [
                    'Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro'
                ]
            }
        }
    },
    contentTypes: {
        title: 'title',
        subTitle: 'subTitle',
        image: 'image',
        text: 'text',
        audio: 'audio',
        video: 'video',
    },
};

export default config;