# alan-micrOCR

Educational project to learn how insurance claim submission, OCR extraction, and reimbursement decisioning work end to end.

## Overview

`alan-micrOCR` is a simple web app that simulates a health reimbursement flow.

A user fills a form with their personal information, selects a coverage plan, uploads one or more supporting medical documents, and gets a reimbursement decision back.

The backend then:

- sends the document to an OCR service,
- extracts the useful claim information,
- applies the selected plan rules,
- returns a clear decision: `approved`, `rejected`, or `manual_review`.

## Why this project

This project is purely educational.

The goal is to better understand how OCR and backend business logic can work together in an insurance-like workflow:

- document ingestion,
- OCR extraction,
- claim reconstruction,
- reimbursement decisioning,
- result persistence.

## User need

Someone covered by a health plan has paid for care and wants to submit a reimbursement request quickly.

They need to know:

- whether their request is valid,
- how much can be reimbursed,
- why it may be refused,
- whether a manual review is required.

## Product flow

1. The user enters their identity details.
2. The user selects a coverage plan.
3. The user uploads one or more medical documents.
4. The backend extracts data through OCR.
5. The backend builds a claim from the extracted data.
6. The backend applies the plan rules.
7. The frontend displays the final decision and reimbursed amount.

## Accepted input documents

The project accepts simple supporting medical documents such as:

- medical invoices,
- payment receipts,
- prescriptions,
- medical certificates.

For the MVP, invoices, receipts, and prescriptions are enough.

## MVP scope

The first version focuses on:

- a simple frontend form,
- plan selection,
- document upload,
- OCR-based data extraction,
- claim processing,
- reimbursement decision display.

The system should persist at least:

- plans,
- members,
- claims,
- OCR results,
- final decisions.

## Out of scope

To keep the project small and focused, the MVP does not include:

- advanced authentication,
- admin dashboards,
- real payments,
- fraud detection,
- complex workflow orchestration,
- microservices.

## Goal

The goal is not to build a full insurance platform.

The goal is to build a clean end-to-end simulation that shows how a real document can be turned into structured claim data and then into a reimbursement decision.
