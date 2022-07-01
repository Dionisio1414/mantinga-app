import { IUpdateFieldPayload } from "~/types/forms/update-field-payload.interface";

export const mixinFormMapperActions = () => {
    return {
        updateFormField({ commit }: any, payload: IUpdateFieldPayload<any>) {
            commit('setFormField', payload);
        },
    }
};


export const mixinFormMapperMutations = () => {
    return {
        setFormField: (state: any, { field, value }: IUpdateFieldPayload<any>) => {
            state.form[field] = value;
        },
    }
};

export const mixinFormMapperUpdateForm = () => {
    return {
        updateForm({ commit }: any, payload: any) {
            commit('updateForm', payload);
        }
    }
}

export const mixinFormMapperMutationUpdateForm = () => {
    return {
        updateForm: (state: any, payload: any) => {
            state.form = { ...state.form, ...payload };
        },
    }
};

export const mixinFormMapperSetForm = () => {
  return {
      setForm({ commit }: any, payload: any) {
          commit('setForm', payload);
      }
  }
}

export const mixinFormMapperMutationSetForm = () => {
  return {
      setForm: (state: any, payload: any) => {
          state.form = { ...payload }
      },
  }
};
