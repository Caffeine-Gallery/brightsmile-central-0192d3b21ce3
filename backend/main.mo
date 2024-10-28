import Bool "mo:base/Bool";
import Func "mo:base/Func";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Debug "mo:base/Debug";

actor DentistOffice {
  // Define types
  type Appointment = {
    name: Text;
    email: Text;
    phone: Text;
    date: Text;
    time: Text;
  };

  // Create a stable variable to store appointments
  stable var appointmentsEntries : [(Text, Appointment)] = [];
  var appointments = HashMap.HashMap<Text, Appointment>(0, Text.equal, Text.hash);

  // System functions for upgrades
  system func preupgrade() {
    appointmentsEntries := Iter.toArray(appointments.entries());
  };

  system func postupgrade() {
    appointments := HashMap.fromIter<Text, Appointment>(appointmentsEntries.vals(), 1, Text.equal, Text.hash);
  };

  // Helper function to generate a unique key for appointments
  func generateAppointmentKey(date: Text, time: Text) : Text {
    date # "_" # time
  };

  // Function to book an appointment
  public func bookAppointment(appointmentData: Appointment) : async Bool {
    let key = generateAppointmentKey(appointmentData.date, appointmentData.time);
    
    switch (appointments.get(key)) {
      case null {
        appointments.put(key, appointmentData);
        Debug.print("Appointment booked successfully");
        true
      };
      case (?_) {
        Debug.print("Appointment slot already taken");
        false
      };
    }
  };

  // Function to get available time slots for a given date
  public query func getAvailableTimeSlots(date: Text) : async [Text] {
    let allTimeSlots = [
      "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
    ];

    let availableSlots = Array.filter<Text>(allTimeSlots, func (time) {
      let key = generateAppointmentKey(date, time);
      switch (appointments.get(key)) {
        case null true;
        case (?_) false;
      }
    });

    availableSlots
  };

  // Function to get all appointments (for admin purposes)
  public query func getAllAppointments() : async [Appointment] {
    Iter.toArray(appointments.vals())
  };
}
