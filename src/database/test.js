const Database = require('./db.js')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    // Inserir dados
    proffyValue = {
        name: 'Ellian Yemon Abe',
        avatar:'https://avatars3.githubusercontent.com/u/51958525?s=460&u=b9e45d8f1657b7a9788c46bc1f9227f2ca88f940&v=4',
        whatsapp: '99123456789',
        bio: 'Entusiasta das melhores tecnologias de desenvolvimento.<br><br>Apaixonado por programar utilizando as melhores novidades disponíveis no mercado, como COBOL, VBA e C language.'
    }

    classValue = {
        subject: 1, 
        cost: "200", 
        // proffy_id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday: 1, 
            time_from: 720, 
            time_to: 1220
        },
        {
            weekday: 0, 
            time_from: 540, 
            time_to: 1220
        }
    ]
    
    //await  createProffy(db, {proffyValue, classValue, classScheduleValues})

    //consultar dados inseridos

    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    //as classes de um determinado professor e trazer juntos os dados do professor
    const selectedClassesAndProffys = await db.all(`
        SELECT  classes.*, proffys.*
        FROM    proffys
        JOIN    classes ON (proffys.id = classes.proffy_id)
        WHERE   classes.proffy_id = 1
    `)
    
    // console.log(selectedClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horário do time_from (8h) precisa ser antes ou igual ao horário solicitado
    // o time_to precisa ser acima
    const selectedClassSchedules = await db.all(`
        SELECT  proffys.*
        FROM    class_schedule
        JOIN    classes ON (class_schedule.class_id = classes.id)
        JOIN    proffys ON (classes.proffy_id = proffys.id)
        WHERE   class_schedule.class_id = 1
        AND     class_schedule.weekday = 0
        AND     class_schedule.time_from <= "540"
        AND     class_schedule.time_to >=  "540"
    `)

    console.log(selectedClassSchedules)

})