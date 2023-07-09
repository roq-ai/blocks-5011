import * as yup from 'yup';

export const snippetValidationSchema = yup.object().shape({
  code: yup.string().required(),
  user_id: yup.string().nullable(),
});
