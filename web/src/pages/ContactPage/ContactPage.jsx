import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  Label,
  FieldError,
  FormError,
  useForm,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/dist/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' })
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted() {
      toast.success('Thank you for your submission!')
    },
  })
  const onSubmit = (data) => {
    create({ variables: { input: data } })
    formMethods.reset()
  }
  return (
    <>
      <Toaster />
      <Form onSubmit={onSubmit} error={error} formMethods={formMethods}>
        <FormError wrapperClassName="error" error={error} />

        <Toaster />
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /^[^@]+@[^.]+\..+$/,
              message: 'Please enter a valid email address',
            },
          }}
          errorClassName="error"
        />
        <FieldError name="email" className="error" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="message" className="error" />
        <Submit disabled={loading}>save</Submit>
      </Form>
    </>
  )
}

export default ContactPage
