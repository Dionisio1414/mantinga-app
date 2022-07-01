import { IDictionary } from "~/types/dictionary.interface"

export interface IReplaceDotService<T> {
    endcodeObjectKey: (field: string) => string,
    decodeObjectKey: (field: string) => string,
    updateObjectKeys: (obj: T) => IDictionary<string>
}

export class ReplaceDotService<T> implements IReplaceDotService<T> {
    public endcodeObjectKey(field: string): string {
        if(/_/g.test(field)) {
            return field.replace(/_/g, '.')
        }

        return field;
    }

    public decodeObjectKey(field: string): string {
        if(/\./g.test(field)) {
            return field.replace(/\./g, '_')
        }

        return field;
    }

    public updateObjectKeys(obj: T): IDictionary<string> {
        const newObj: IDictionary<string> = {}

        Object
            .entries(obj)
            .forEach(([field, value]) => {
                try {
                    newObj[this.endcodeObjectKey(field)] = value
                } catch(err: any) {
                    console.warn(`Can't parse field '${field}'`)
                }
            })

        return newObj
    }

}