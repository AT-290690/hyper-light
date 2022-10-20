:= [scope; -> [.. [:= [bindings; :: []];
-> [name; value; ? [value; .= [bindings; name; value]; . [bindings; name]]]]]];

:= [vars; scope []];
:= [log; LOGGER [0]];
vars ["x"; 10];
log [vars ["x"; void]]