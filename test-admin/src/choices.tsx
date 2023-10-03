export interface ChoiceOption {
    id: string;
    name: string;
}

export const clasificacionChoices: ChoiceOption[] = [
    {id:'Servicios', name:'Servicios'},
    {id:'Digital', name:'Digital'},
    {id:'Infraestructura', name:'Infraestructura'},
    {id:'Recursos Humanos', name:'Recursos Humanos'},
    {id:'Beneficios', name:'Beneficios'},
    {id:'Mobiliario', name:'Mobiliario'},
    {id:'Seguridad', name:'Seguridad'},
    {id:'Materiales', name:'Materiales'},
    {id:'Fenómeno meteorológico', name:'Fenómeno meteorológico'},
    {id:'Otro', name:'Otro'}
];
export const tipoChoicesMapping: Record<string, ChoiceOption[]> = {
    'Servicios': [
        {id:'agua', name:'Agua'},
        {id:'luz', name:'Luz'},
        {id:'telefono', name:'Telefono'}, 
        {id:'basura', name:'Basura'},
        {id:'limpieza del aula', name:'Limpieza del Aula'},
    ],
    'Digital': [
        {id:'internet, servidores y equipos', name:'Internet, Servidores y Equipos'},
        {id:'software', name:'Software'},
        {id:'hardware', name:'Hardware'},
        {id:'cámaras de seguridad', name: 'Cámaras de seguridad'},
        {id:'soporte técnico presencial y remoto', name: 'Soporte técnico presencial y remoto'},
    ],
    'Infrestructura': [
        {id:'paredes', name:'Paredes'},
        {id:'techo', name:'Techo'},
        {id:'ventanas', name:'Ventanas'},
        {id:'puertas', name:'Puertas'},
        {id:'Aulas en general', name:'Aulas en general'}
    ],
    'Recursos Humanos': [
        {id:'permisos', name:'Permisos'},
        {id:'asistencias', name:'Asistencias'},
        {id:'salud', name:'Salud'},
        {id:'trámites', name:'Trámites'},
        {id:'honorarios', name:'Honorarios'}
    ],
    'Beneficiarios': [
        {id:'asistencias', name:'Asistencias'},
        {id:'documentación', name:'Documentación'},
        {id:'apoyo académico', name:'Apoyo académico'},
        {id:'Salud', name:'Seguridad, bulling'}
    ],
    'Mobiliario': [
        {id:'sillas, butacas', name:'Sillas, butacas'},
        {id:'escritorios', name:'Escritorios'},
        {id:'pizarrones', name:'Pizarrones'},
        {id:'cafetería', name:'Cafetería'},
        {id:'estantes, archiveros', name:'Estantes, archiveros'}
    ],
    'Seguridad': [
        {id:'delincuencia', name:'Delincuencia'},
        {id:'robos', name:'Robos'},
        {id:'bandalismo', name:'Bandalismo'},
        {id:'imagen institucional', name:'Imagen institucional'}
    ],
    'Materiales': [
        {id:'educativos', name:'Educativos'},
        {id:'papelería', name:'Papelería'},
        {id:'limpieza', name:'Limpieza'}
    ],
    'Fenómeno meteorológico': [
        {id:'inundaciones', name:'Inundaciones'},
        {id:'incendios', name:'Incendios'},
        {id:'sismos', name:'Sismos'}
    ],
};

export const prioridadChoices: ChoiceOption[] = [
        {id:'Bajo', name:'Bajo'},
        {id:'Intermedio', name:'Intermedio'},
        {id:'Alto', name:'Alto'}
    ];

 export const estatusChoices: ChoiceOption[] = [
        {id:'no iniciado', name:' No Iniciado'},
        {id:'iniciado', name:'Iniciado'},
        {id:'en proceso', name:'En proceso'},
        {id:'terminado', name:'Terminado'}
    ];
export const rolChoices: ChoiceOption[] = [
    {id:"Supervisor de Aula", name:"Supervisor de Aula"},
    {id:"Supervisor Nacional", name:"Supervisor Nacional"},
    {id:"Supervisor Ejecutivo", name:"Supervisor Ejecutivo"},
];
