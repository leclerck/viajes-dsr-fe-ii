import Input from '../atoms/Input'
import Label from '../atoms/Label'
import Text from '../atoms/Text'

export default function DateRangeFields({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  error,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <Label htmlFor="checkIn">Check-in</Label>
        <Input
          id="checkIn"
          type="date"
          value={checkIn}
          onChange={(e) => onCheckInChange(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="checkOut">Check-out</Label>
        <Input
          id="checkOut"
          type="date"
          value={checkOut}
          onChange={(e) => onCheckOutChange(e.target.value)}
        />
      </div>
      {error ? (
        <Text variant="error" className="sm:col-span-2">
          {error}
        </Text>
      ) : null}
    </div>
  )
}
