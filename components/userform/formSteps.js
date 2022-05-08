import { Field } from 'formik'
import { goals } from '../../bin/goals'


const Goals = () => {
  return (
    <>
      {goals.map(goal => {
        <div key={goal}>
          <p>{goal}</p>
          <Field type="checkbox" name={goal} />
        </div>
      })}
    </>
  )
}

export const formSteps = [ Goals ]