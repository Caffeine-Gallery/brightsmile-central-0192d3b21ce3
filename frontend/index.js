import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const timeSelect = document.getElementById('time');
  const appointmentForm = document.getElementById('appointment-form');
  const dateInput = document.getElementById('date');

  dateInput.addEventListener('change', async () => {
    const selectedDate = dateInput.value;
    await updateAvailableTimeSlots(selectedDate);
  });

  appointmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(appointmentForm);
    const appointmentData = Object.fromEntries(formData.entries());

    try {
      const result = await backend.bookAppointment(appointmentData);
      if (result) {
        alert('Appointment booked successfully!');
        appointmentForm.reset();
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('An error occurred while booking the appointment. Please try again.');
    }
  });

  async function updateAvailableTimeSlots(date) {
    try {
      const availableSlots = await backend.getAvailableTimeSlots(date);
      timeSelect.innerHTML = '<option value="">Select a time</option>';
      availableSlots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        timeSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error fetching available time slots:', error);
    }
  }
});
