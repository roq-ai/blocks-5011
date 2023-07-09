import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createComment } from 'apiSdk/comments';
import { Error } from 'components/error';
import { commentValidationSchema } from 'validationSchema/comments';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { SnippetInterface } from 'interfaces/snippet';
import { getUsers } from 'apiSdk/users';
import { getSnippets } from 'apiSdk/snippets';
import { CommentInterface } from 'interfaces/comment';

function CommentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CommentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createComment(values);
      resetForm();
      router.push('/comments');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CommentInterface>({
    initialValues: {
      content: '',
      user_id: (router.query.user_id as string) ?? null,
      snippet_id: (router.query.snippet_id as string) ?? null,
    },
    validationSchema: commentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Comment
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="content" mb="4" isInvalid={!!formik.errors?.content}>
            <FormLabel>Content</FormLabel>
            <Input type="text" name="content" value={formik.values?.content} onChange={formik.handleChange} />
            {formik.errors.content && <FormErrorMessage>{formik.errors?.content}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<SnippetInterface>
            formik={formik}
            name={'snippet_id'}
            label={'Select Snippet'}
            placeholder={'Select Snippet'}
            fetcher={getSnippets}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.code}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'comment',
    operation: AccessOperationEnum.CREATE,
  }),
)(CommentCreatePage);
