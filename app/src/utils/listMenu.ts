export interface IListMenu {
    name: string
    url: string
}

export const listMenu: IListMenu[] = [
    {
        name: 'Perfil',
        url: '/perfil',
    },
    {
        name: 'Buscar',
        url: '/',
    },
    {
        name: 'Habilidades',
        url: '/inventario-skill',
    },
    {
        name: 'Proyectos',
        url: '/proyectos',
    }
]