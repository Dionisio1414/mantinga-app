import { Store } from 'vuex';

export interface IStoreFormMapperOptions {
    store: Store<any>;
    getter: string;
    action: string;
    fields: string[];
}

/**
 * Use this function to connect form fields with the store.
 * Example:
 *
 * ```ts
 *
 *  const FIELDS: string[] = [
 *      'username',
 *      'password'
 *  ];
 *
 * class ComponentSignIn extends Vue {
 *     ...
 *     public get form(): any {
 *         return storeFormMapper({
 *             store: this.$store,
 *             getter: `${STORE_TOKENS.PAGE_SIGN_IN_FORM}/${ECommonGetters.FORM_VALUE}`,
 *             action: `${STORE_TOKENS.PAGE_SIGN_IN_FORM}/${ECommonActions.UPDATE_FORM_FIELD}`,
 *             fields: FIELDS
 *         });
 *     }
 *     ...
 * }
 *
 * ```
 */
export default function ({ store, getter, action, fields }: IStoreFormMapperOptions): {} {
    const obj = {};

    fields.forEach((field: string) => {
        Object.defineProperty(
            obj,
            field,
            {
                get: () => {
                    return store.getters[getter][field];
                },
                set: (value) => {
                    if (store.getters[getter][field] === value) {
                        return;
                    }

                    store.dispatch(
                        action,
                        {
                            field,
                            value
                        }
                    );
                }
            }
        );
    });

    return obj;
}
