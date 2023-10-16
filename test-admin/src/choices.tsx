export interface ChoiceOption {
    id: string;
    name: string;
}

export const clasificacionChoices: ChoiceOption[] = [
    {id:'Servicios', name:'Servicios'},
    {id:'Digital', name:'Digital'},
    {id:'Infraestructura', name:'Infraestructura'},
    {id:'Recursos Humanos', name:'Recursos Humanos'},
    {id:'Beneficiarios', name:'Beneficiarios'},
    {id:'Mobiliario', name:'Mobiliario'},
    {id:'Seguridad', name:'Seguridad'},
    {id:'Materiales', name:'Materiales'},
    {id:'Fenómeno meteorológico', name:'Fenómeno meteorológico'},
    {id:'Otro', name:'Otro'}
];
export const tipoChoicesMapping: Record<string, ChoiceOption[]> = {
    'Servicios': [
        {id:'Agua', name:'Agua'},
        {id:'Luz', name:'Luz'},
        {id:'Telefono', name:'Telefono'}, 
        {id:'Basura', name:'Basura'},
        {id:'Limpieza del aula', name:'Limpieza del Aula'},
    ],
    'Digital': [
        {id:'Internet, servidores y equipos', name:'Internet, Servidores y Equipos'},
        {id:'Software', name:'Software'},
        {id:'Hardware', name:'Hardware'},
        {id:'Cámaras de seguridad', name: 'Cámaras de seguridad'},
        {id:'Soporte técnico presencial y remoto', name: 'Soporte técnico presencial y remoto'},
    ],
    'Infraestructura': [
        {id:'Paredes', name:'Paredes'},
        {id:'Techo', name:'Techo'},
        {id:'Ventanas', name:'Ventanas'},
        {id:'Puertas', name:'Puertas'},
        {id:'Aulas en general', name:'Aulas en general'}
    ],
    'Recursos Humanos': [
        {id:'Permisos', name:'Permisos'},
        {id:'Asistencias', name:'Asistencias'},
        {id:'Salud', name:'Salud'},
        {id: 'Trámites', name:'Trámites'},
        {id:'Honorarios', name:'Honorarios'}
    ],
    'Beneficiarios': [
        {id:'Asistencias', name:'Asistencias'},
        {id:'Documentación', name:'Documentación'},
        {id:'Apoyo académico', name:'Apoyo académico'},
        {id:'Salud', name:'Seguridad, bulling'}
    ],
    'Mobiliario': [
        {id:'Sillas, butacas', name:'Sillas, butacas'},
        {id:'Escritorios', name:'Escritorios'},
        {id:'Pizarrones', name:'Pizarrones'},
        {id:'Cafetería', name:'Cafetería'},
        {id:'Estantes, archiveros', name:'Estantes, archiveros'}
    ],
    'Seguridad': [
        {id:'Delincuencia', name:'Delincuencia'},
        {id:'Robos', name:'Robos'},
        {id:'Bandalismo', name:'Bandalismo'},
        {id:'Imagen institucional', name:'Imagen institucional'}
    ],
    'Materiales': [
        {id:'Educativos', name:'Educativos'},
        {id:'Papelería', name:'Papelería'},
        {id:'Limpieza', name:'Limpieza'}
    ],
    'Fenómeno meteorológico': [
        {id:'Inundaciones', name:'Inundaciones'},
        {id:'Incendios', name:'Incendios'},
        {id:'Sismos', name:'Sismos'}
    ],
};

export const prioridadChoices: ChoiceOption[] = [
        {id:'Bajo', name:'Bajo'},
        {id:'Intermedio', name:'Intermedio'},
        {id:'Alto', name:'Alto'}
    ];

 export const estatusChoices: ChoiceOption[] = [
        {id:'Creado', name:'Creado'},
        {id:'Iniciado', name:'Iniciado'},
        {id:'En proceso', name:'En proceso'},
        {id:'Terminado', name:'Terminado'}
    ];
export const rolChoices: ChoiceOption[] = [
    {id:"Supervisor de Aula", name:"Supervisor de Aula"},
    {id:"Supervisor Nacional", name:"Supervisor Nacional"},
    {id:"Supervisor Ejecutivo", name:"Supervisor Ejecutivo"},
    {id:"Administrador", name:"Administrador"}
];
