import { Radio, RadioGroup } from '@douyinfe/semi-ui'

type EditGenderProps = {
    value? : number,
    onChange?: (value: any) => void
}

const gender = [
    { title: "Nam", value: 0},
    { title: "Nữ", value: 1},
    { title: "Khác", value: 2}
]

const EditGender = (props: EditGenderProps) => {
    const { value, onChange } = props;

    const handleChange = (value: any) => {
        onChange(value)
    }

    return (
        <RadioGroup value={value} onChange={(vl) => handleChange(vl)}>
            {gender.map((item, index) => {
                return <Radio key={index} value={item.value}>{item.title}</Radio>
            })}
        </RadioGroup>
    )
}

export default EditGender;