#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
DB="$(mktemp).db"
ACTUAL="$(mktemp)"
trap 'rm -f "$DB" "$ACTUAL"' EXIT

TOTAL=8
EXERCISES="01 02 03 04 05 06 07 08"

reset_db() {
  rm -f "$DB"
  sqlite3 "$DB" < "$ROOT/db/schema.sql"
  sqlite3 "$DB" < "$ROOT/db/seed.sql"
}

extract_query() {
  local id="$1"
  sed -n "/-- @query ${id}/,/-- @end ${id}/{ /-- @query ${id}/d; /-- @end ${id}/d; p; }" "$ROOT/drill.sql" \
    | sed '/^[[:space:]]*$/d'
}

PASSED=0
FAILED=0
FAILED_LIST=""

for id in $EXERCISES; do
  reset_db
  QUERY="$(extract_query "$id")"
  if [ -z "$QUERY" ]; then
    echo "❌ Exercice $id : requête vide"
    FAILED=$((FAILED + 1))
    FAILED_LIST="$FAILED_LIST $id"
    continue
  fi

  VERIFY="$ROOT/verify/ex${id}.sql"
  if [ -f "$VERIFY" ]; then
    if ! sqlite3 "$DB" <<< "$QUERY" 2>/dev/null; then
      echo "❌ Exercice $id : erreur SQL"
      FAILED=$((FAILED + 1))
      FAILED_LIST="$FAILED_LIST $id"
      continue
    fi
    if ! sqlite3 -header -column "$DB" < "$VERIFY" > "$ACTUAL" 2>/dev/null; then
      echo "❌ Exercice $id : erreur sur la vérification"
      FAILED=$((FAILED + 1))
      FAILED_LIST="$FAILED_LIST $id"
      continue
    fi
  else
    if ! sqlite3 -header -column "$DB" <<< "$QUERY" > "$ACTUAL" 2>/dev/null; then
      echo "❌ Exercice $id : erreur SQL"
      FAILED=$((FAILED + 1))
      FAILED_LIST="$FAILED_LIST $id"
      continue
    fi
  fi

  if diff -u "$ROOT/expected/ex${id}.txt" "$ACTUAL" > /dev/null 2>&1; then
    echo "✅ Exercice $id"
    PASSED=$((PASSED + 1))
  else
    echo "❌ Exercice $id : résultat incorrect"
    FAILED=$((FAILED + 1))
    FAILED_LIST="$FAILED_LIST $id"
  fi
done

echo ""
echo "Score : $PASSED/$TOTAL"
if [ "$FAILED" -gt 0 ]; then
  echo "Ratés :$FAILED_LIST"
  exit 1
fi
