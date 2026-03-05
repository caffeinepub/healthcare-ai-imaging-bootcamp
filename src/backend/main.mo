import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile type as required by the frontend
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Application-specific types
  type Lead = {
    name : Text;
    email : Text;
    phone : Text;
    background : Text;
  };

  module Lead {
    public func compare(lead1 : Lead, lead2 : Lead) : Order.Order {
      switch (Text.compare(lead1.name, lead2.name)) {
        case (#equal) { Text.compare(lead1.email, lead2.email) };
        case (order) { order };
      };
    };
  };

  type BrochureRequest = {
    email : Text;
  };

  let leads = Map.empty<Text, Lead>();
  let brochureRequests = Map.empty<Text, BrochureRequest>();

  // Public endpoint - no authorization required (accessible to guests/anonymous users)
  public shared ({ caller }) func submitLead(name : Text, email : Text, phone : Text, background : Text) : async () {
    let lead : Lead = {
      name;
      email;
      phone;
      background;
    };
    leads.add(email, lead);
  };

  // Public endpoint - no authorization required (accessible to guests/anonymous users)
  public shared ({ caller }) func requestBrochure(email : Text) : async () {
    let request : BrochureRequest = { email };
    brochureRequests.add(email, request);
  };

  // Admin-only endpoint
  public query ({ caller }) func getAllLeads() : async [Lead] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    leads.values().toArray().sort();
  };

  // Admin-only endpoint
  public query ({ caller }) func getAllBrochureRequests() : async [BrochureRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    brochureRequests.values().toArray();
  };
};
