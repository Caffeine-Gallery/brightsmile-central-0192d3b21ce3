export const idlFactory = ({ IDL }) => {
  const Appointment = IDL.Record({
    'date' : IDL.Text,
    'name' : IDL.Text,
    'time' : IDL.Text,
    'email' : IDL.Text,
    'phone' : IDL.Text,
  });
  return IDL.Service({
    'bookAppointment' : IDL.Func([Appointment], [IDL.Bool], []),
    'getAllAppointments' : IDL.Func([], [IDL.Vec(Appointment)], ['query']),
    'getAvailableTimeSlots' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Text)],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
