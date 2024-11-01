import exampleRepository from './example'
import gasRepository from './gas'
import sqliteRepository from './sqlite'

import type { Repository } from './type'

const defaultRepository=exampleRepository

const mapper={
    example:exampleRepository,
    gas:gasRepository,
    sqlite:sqliteRepository,
}


export function useRepository():Repository{
    const mode=process.env.MODE
    if(Object.keys(mapper).includes(mode ?? ''))
        return mapper[mode as keyof typeof mapper]
    else return defaultRepository
}