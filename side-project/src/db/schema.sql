CREATE TABLE plans (
	id				UUID PRIMARY KEY,
	name			TEXT NOT NULL UNIQUE,
	created_at		TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE coverage_rules (
	id					UUID PRIMARY KEY,
	plan_id				UUID NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
	care_category		TEXT NOT NULL,
	reimbursement_rate	NUMERIC(5, 4) NOT NULL,
	claim_cap_amount	NUMERIC(10, 2),
	created_at			TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	UNIQUE (plan_id, care_category)
);

CREATE TABLE members (
	id				UUID PRIMARY KEY,
	first_name		TEXT NOT NULL,
	last_name		TEXT NOT NULL,
	email			TEXT NOT NULL UNIQUE,
	plan_id			UUID NOT NULL REFERENCES plans(id),
	created_at		TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE claims (
	id				UUID PRIMARY KEY,
	member_id		UUID NOT NULL REFERENCES members(id),
	care_category	TEXT NOT NULL,
	prestation_date	DATE NOT NULL,
	amount_claimed	NUMERIC(10, 2) NOT NULL,
	status			TEXT NOT NULL,
	created_at		TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	processed_at	TIMESTAMPTZ
);

CREATE TABLE claim_documents (
	id				UUID PRIMARY KEY,
	claim_id		UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
	document_type	TEXT NOT NULL,
	file_name		TEXT NOT NULL,
	notes			TEXT,
	created_at		TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE decisions (
	id				UUID PRIMARY KEY,
	claim_id		UUID NOT NULL UNIQUE REFERENCES claims(id) ON DELETE CASCADE,
	amount_approved	NUMERIC(10, 2),
	reason_code		TEXT NOT NULL,
	reason_message	TEXT NOT NULL,
	created_at		TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
